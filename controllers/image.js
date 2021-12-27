const Clarifai=require('clarifai');
//API KEY
//570d4ef66c7f47819b55ea6a261c5174
const app = new Clarifai.App({
  apiKey : '570d4ef66c7f47819b55ea6a261c5174'
});





const handleApiCall=(req,res)=>{
	app.models
	.predict(Clarifai.FACE_DETECT_MODEL,req.body.input)
	.then(data=>{
		res.json(data);
	})
	.catch(err=>res.status(400).json('unable to work with API'))
}




const handleImage=(req,res,db)=>{
	const {id}=req.body;
	db('users').where('id','=',id)
	.increment('entries',1)
	.returning('entries')
	.then(entries=>{
		res.json(entries[0]);
	})
	.catch(err=>res.status(400).json('unable to get entries'));
}




module.exports={
	handleImage,
	handleApiCall
};