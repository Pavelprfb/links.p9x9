// routes/middleware.js
module.exports = function (req, res, next) {
    
    // চাইলে req এও রাখতে পারেন
    req.redirectUrl = "https://t.me/virallink9050";

    // পরবর্তী middleware বা রাউটে যাও
    next();
};