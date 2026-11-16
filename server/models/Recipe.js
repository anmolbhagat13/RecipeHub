
const mongoose = require('mongoose')

const recipeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },

  description: {
    type: String,
    required: true
  },

  ingredients: {
    type: [String],
    required: true
  },

  instructions: {
    type: [String],
    required: true
  },

  image: {
    type: String,
    default: ''
  },

  category: {
    type: String,
    required: true
  },

  cookingTime: {
    type: Number,
    required: true
  },

  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }

}, { timestamps: true })

const Recipe = mongoose.model('Recipe', recipeSchema)

module.exports = Recipe
