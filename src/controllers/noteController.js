const noteModel = require("../model/note")

const createNote = async (req, res) => {

    console.log("HTTP Method - createNote - UserId - " + req.userId );


    try {
        
        const{title, description, priority} = req.body
        const userId = req.userId

        const newNote = new noteModel({
            title: title,
            description: description,
            priority: priority,
            userId: userId
        });

        await newNote.save();

        res.status(200).json({
            note: newNote,
        status: 200,
    });


    } catch (error) {
        console(error)
        res.status(500).json({
            message: "Something went wrong"
        });
    }

}

const updateNote = async (req, res) => {

    console.log("HTTP Method - updateNote - UserId - " + req.userId );


    const id = req.params.id;

    const{title, description, priority} = req.body

    const newNote = {
        userId : req.userId,
        title : title,
        description : description,
        priority : priority
    }

    try {
        
        await noteModel.findByIdAndUpdate(id, newNote, {new : true})
        res.status(200).json({
            note: newNote,
            status: 200
        })


    } catch (error) {
         console.log(error)
        res.status(500).json({
            message: "Something went wrong"
        });
    }

}

const deleteNote = async (req, res) => {

    console.log("HTTP Method - deleteNote - UserId - " + req.userId );

    const id = req.params.id;

    try{

        const result = await noteModel.findByIdAndRemove(id)
        res.status(200).json({
            status : 200
        })

    }catch(error){
          console.log(error)
        res.status(500).json({
            message: "Something went wrong"
        });
    }


}

const getNote = async (req, res) => {

    console.log("HTTP Method - getNote - UserId - " + req.userId );

    try {
        
    const userId = req.userId;
    
    const note = await noteModel.find({userId : userId});

    res.status(200).json({
        note,
        status: 200,
    })


    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "Something went wrong"
        });
    }
}

module.exports = {
    createNote,
    getNote,
    deleteNote,
    updateNote
}