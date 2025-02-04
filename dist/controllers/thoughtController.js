import Thought from "../models/Thought.js";
export const getAllThoughts = async (_req, res) => {
    try {
        const thoughts = await Thought.find();
        res.json(thoughts);
    }
    catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};
export const getThoughtById = async (req, res) => {
    try {
        const { thoughtId } = req.params;
        const thought = await Thought.findById(thoughtId);
        if (!thought) {
            res.status(404).json({
                message: 'Thought not found'
            });
            return;
        }
        res.json(thought);
    }
    catch (err) {
        res.status(500).json(err);
    }
};
export const createThought = async (req, res) => {
    try {
        const thought = await Thought.create(req.body);
        res.json(thought);
    }
    catch (err) {
        res.status(500).json(err);
    }
};
export const updateThoughtById = async (req, res) => {
    try {
        const { thoughtId } = req.params;
        const updatedThought = await Thought.findByIdAndUpdate(thoughtId, req.body, {
            new: true,
            runValidators: true
        });
        if (!updatedThought) {
            res.status(404).json({
                message: 'Thought not found',
            });
            return;
        }
        res.json(updatedThought);
    }
    catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};
export const deleteThoughtById = async (req, res) => {
    try {
        const { thoughtId } = req.params;
        const deletedUser = await Thought.findByIdAndDelete(thoughtId);
        if (!deletedUser) {
            res.status(404).json({
                message: 'Thought not deleted',
            });
            return;
        }
        res.json({ message: 'Thought successfully deleted' });
    }
    catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};
export const createReaction = async (req, res) => {
    try {
        const thought = await Thought.findByIdAndUpdate(req.params.thoughtId, { $push: { reactions: req.body } }, { runValidators: true, new: true });
        if (!thought) {
            res.status(404).json({
                message: 'No thought found with that ID :('
            });
            return;
        }
        res.json(thought);
    }
    catch (err) {
        res.status(500).json(err);
    }
};
export const deleteReaction = async (req, res) => {
    try {
        const thought = await Thought.findByIdAndUpdate(req.params.thoughtId, { $pull: { reaction: { reactionId: req.params.reactionId } } }, { runValidators: true, new: true });
        if (!thought) {
            res.status(404).json({
                message: 'No student found with that ID :('
            });
            return;
        }
        res.json({ message: 'Reaction successfully deleted' });
    }
    catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};
export default {
    getAllThoughts,
    getThoughtById,
    createThought,
    updateThoughtById,
    deleteThoughtById,
    createReaction,
    deleteReaction
};
