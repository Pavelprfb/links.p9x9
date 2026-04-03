const Post = require("../models/Post");
const UsersModel = require("../models/Comment");

// Show All
exports.getAll = async (req,res)=>{
  const posts = await Post.find().sort({createdAt:-1});
  
  res.render("index",{posts});
};

// Create Form
exports.createForm = (req,res)=>{
  res.render("create");
};

// Store Data
// Controller: create or update post
exports.createPost = async (req, res) => {
  try {
    const { routeName, category, ...rest } = req.body;

    if (!routeName) {
      return res.status(400).send("routeName is required");
    }

    // category কে array তে রূপান্তর করুন
    const categoryArray = category ? category.split(",") : [];

    await Post.findOneAndUpdate(
      { routeName },                     // filter: check if routeName exists
      { ...rest, category: categoryArray }, // update data
      { upsert: true, returnDocument: 'after' } // create if not exist, return new doc
    );

    res.redirect("/");
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};

// Edit Form
exports.editForm = async (req,res)=>{
  const data = await Post.find({});
  res.render("edit",{data});
};

// Update
exports.updatePost = async (req,res)=>{
  await Post.findByIdAndUpdate(req.params.id,{
    ...req.body,
    category: req.body.category.split(",")
  });
  res.redirect("/");
};

// Delete
exports.delete = async (req,res)=>{
  const data = await Post.find({});
  res.render("delete", {data});
};
exports.deletePost = async (req,res)=>{
  await Post.findByIdAndDelete(req.params.id);
  res.redirect("/");
};

// API
exports.getAllJSON = async (req,res)=>{
  const posts = await Post.find();
  res.json(posts);
};
// Homepage with Search + Pagination
exports.getAll = async (req,res)=>{
  const page = parseInt(req.query.page) || 1;
  const limit = 20;
  const skip = (page - 1) * limit;

  const search = req.query.search || "";

  const query = search 
    ? { title: { $regex: search, $options: "i" } }
    : {};

  const posts = await Post.find(query)
    .sort({createdAt:-1})
    .skip(skip)
    .limit(limit);

  const total = await Post.countDocuments(query);
  const hasNext = total > page * limit;
  
  
  const redirectUrl = "https://controlslaverystuffing.com/hgby672m85?key=0a2654bd9cf4b3adc51573aa7e9e1b77";
  const websiteUrl = "https://links.p9x9.com";
  const websiteName = "Links.P9X9";
  const websiteFavicon = "https://links.p9x9.com/images/logo.png";
  const telegramChannel = "https://telegram.p9x9.com/AuDDLZklB";
  
  res.render("index", { posts, page, hasNext, search, redirectUrl, websiteUrl, websiteName, websiteFavicon, telegramChannel });
};
exports.singleData = async (req,res)=>{
  const { routeName } = req.params;
  const allData = await Post.findOne({routeName});
  res.json(allData);
};


// Single Video Page
exports.singleVideo = async (req, res) => {
  const post = await Post.findOne({ routeName: req.params.routeName });
  const allComment = await UsersModel.find({ postRouteName: req.params.routeName })
                                   .sort({ _id: -1 }); // -1 মানে newest first
  
  if (!post) return res.send("Not Found");

  const page = parseInt(req.query.page) || 1;
  const limit = 20;
  const skip = (page - 1) * limit;

  // Fetch videos that are older than current post
  const suggestions = await Post.find({
    createdAt: { $lt: post.createdAt } // current ভিডিওর আগে
  })
    .sort({ createdAt: -1 }) // নতুন থেকে পুরনো, অর্থাৎ আগের ভিডিওগুলোর মধ্যে রিভার্স অর্ডার
    .skip(skip)
    .limit(limit);

  // Check if more older videos exist
  const totalSuggestions = await Post.countDocuments({
    createdAt: { $lt: post.createdAt }
  });
  const hasNext = skip + suggestions.length < totalSuggestions;
  
  
  const redirectUrl = "https://controlslaverystuffing.com/hgby672m85?key=0a2654bd9cf4b3adc51573aa7e9e1b77";
  const websiteUrl = "https://links.p9x9.com";
  const websiteName = "Links.P9X9";
  const websiteFavicon = "https://links.p9x9.com/images/logo.png";
  const telegramChannel = "https://telegram.p9x9.com/AuDDLZklB";
  
  
  res.render("single", { post, suggestions, page, hasNext, redirectUrl, websiteUrl, websiteName, websiteFavicon, telegramChannel, allComment });
};
exports.play = async (req, res) => {
 const { routeName } = req.body;
 const playData = await Post.findOne({routeName});
 res.render("play", {post: playData});
};


// Dynamic sitemap generator
exports.getSitemap = async (req, res) => {
  try {
    const posts = await Post.find({}, "routeName createdAt updatedAt").sort({ createdAt: -1 });

    // XML header
    let sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n`;
    sitemap += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

    // Root URL
    sitemap += `
  <url>
    <loc>https://links.p9x9.com</loc>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>\n`;

    // Video URLs
    posts.forEach(post => {
      sitemap += `
  <url>
    <loc>https://links.p9x9.com/videos/${post.routeName}</loc>
    <lastmod>${post.updatedAt ? post.updatedAt.toISOString() : post.createdAt.toISOString()}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>\n`;
    });

    sitemap += `</urlset>`;

    // XML content type
    res.header("Content-Type", "application/xml");
    res.send(sitemap);

  } catch (err) {
    console.error("Sitemap generation error:", err);
    res.status(500).send("Server Error");
  }
};


exports.updateViwe = async (req, res) => {
  try {

    const { id } = req.params;

    await Post.findByIdAndUpdate(
      id,
      { $inc: { totalView: 1 } },
      { returnDocument: "after" }
    );

    res.sendStatus(200);

  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};