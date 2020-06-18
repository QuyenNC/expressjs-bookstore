module.exports.valPostCreate = function(req, res, next){
    var erros = [];
    if(!req.body.name  ){
        erros.push('Username is required');
    }
    if(req.body.name.length > 30 ){
        erros.push('Username is greater than 30 characters')
    }
    if(!req.body.password){
        erros.push('Password is required');
    }
    if(!req.body.email){
        erros.push('Email is required');
    }
    if(!req.body.date){
        erros.push('Date is required');
    }
    if(erros.length){
        res.render('users/create',{
            erros : erros,
            values : req.body
        });
        return;
    };
    next();
}