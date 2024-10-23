const express = require( 'express' );
const { getSingleTask, getAllTasks, createTask, updateTask, deleteTask } = require( '../controllers/tasks' );
const router = express.Router();


router.get("/", getAllTasks);
router.get( "/:id", getSingleTask );

router.post( "/", createTask );

router.patch( "/:id", updateTask );

router.delete("/:id", deleteTask);

module.exports = router;