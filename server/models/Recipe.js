
const mongoose = require('mongoose')

const recipeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Recipe title is required'],
    trim: true,
    minlength: [3, 'Title must be at least 3 characters'],
    maxlength: [100, 'Title cannot exceed 100 characters']
  },

  description: {
    type: String,
    required: [true, 'Recipe description is required'],
    trim: true,
    maxlength: [500, 'Description cannot exceed 500 characters']
  },

  ingredients: {
    type: [{
      type: String,
      trim: true
    }],
    required: [true, 'Ingredients are required'],
    validate: {
      validator: arr => arr.length > 0 && arr.every(item => item.length > 0),
      message: 'Ingredients cannot be empty'
    }
  },

  instructions: {
    type: [{
      type: String,
      trim: true
    }],
    required: [true, 'Instructions are required'],
    validate: {
      validator: arr => arr.length > 0 && arr.every(item => item.length > 0),
      message: 'Instructions cannot be empty'
    }
  },

  image: {
    type: String,
    default: ''
  },

  category: {
    type: String,
    required: [true, 'Recipe category is required'],
    trim: true
  },

  cookingTime: {
    type: Number,
    required: [true, 'Cooking time is required'],
    min: [1, 'Cooking time must be at least 1 minute']
  },

  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }

}, { timestamps: true })

const Recipe = mongoose.model('Recipe', recipeSchema)

module.exports = Recipe
