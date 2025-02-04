import { Router } from "express";

const router = Router();
import {
    getAllThoughts,
    getThoughtById, 
    createThought,
    updateThoughtById,
    deleteThoughtById,
    createReaction,
    deleteReaction
} from '../../controllers/thoughtController.js';


router.route('/').get(getAllThoughts).post(createThought);
 
router.route('/:thoughtId').get(getThoughtById).put(updateThoughtById).delete(deleteThoughtById);

router.route('/:thoughtId/reactions').post(createReaction);

router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction)
export { router as thoughtRoutes} ;