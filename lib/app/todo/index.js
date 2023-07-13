const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
    req.session.save(() => {
    res.redirect(303, '/todo/list'); 
    })
}); 

router.get('/list', (req, res) => {

    res.render('todo/hello.hbs', req.session);
});
 
router.post('/add', (req, res) =>{
   if(req.session.iteamlist) 
   req.session.iteamlist.push(req.body);
   else req.session.iteamlist = [req.body];
  
   req.session.save(() => {

    res.redirect(303, '/list'); 
    });

  });

router.post('/save', (req, res) =>{
  //req.session.iteamlist: object of iteams
  //req.body: object of checkboxes
  //req.session.checkboxForm: form of checkbox
  let indexForm = 0 ;
  req.session.checkboxForm = req.body;
  for(let indList in req.session.iteamlist){

    if(req.session.checkboxForm[indexForm] === "on"){
          req.session.iteamlist[indexForm].checkbox = "checked";
    }else{
      req.session.iteamlist[indexForm].checkbox = " ";
    }
    indexForm = indexForm + 1;
  }
        req.session.save(() => {
            res.redirect(303, '/todo/list'); 
            }); 
            ;} 
);


router.post('/remove', (req, res) =>{
  //req.session.iteamlist[indList] each property
  let indexForm = 0 ;
  let lastProp = 0;
  req.session.checkboxForm = req.body;
  for(let indList in req.session.iteamlist){

    if(req.session.checkboxForm[indexForm] === "on"){
       delete req.session.iteamlist[indexForm];
    }

  }

  for(let indList in req.session.iteamlist){
    if(req.session.iteamlist[indList] !== null){
     req.session.iteamlist[lastProp] = req.session.iteamlist[indexForm];
     lastProp = lastProp + 1;
    }
    
    indexForm = indexForm + 1;

  }


  for(let i=0; i<= lastProp; i++){
   req.session.iteamlist[i] =  req.session.iteamlist[i]
  
}
  req.session.save(() => {
    res.redirect(303, '/todo/list'); 
    }); 

});

module.exports = { router };