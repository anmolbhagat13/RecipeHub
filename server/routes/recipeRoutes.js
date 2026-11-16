const express = require('express')
const router = express.Router()

const {
  createRecipe,
  getAllRecipes,
  getRecipeById,
  updateRecipe,
  deleteRecipe
} = require('../controllers/recipeController')

const authMiddleware = require('../middleware/authMiddleware')

// Get all recipes (Public)
router.get('/', getAllRecipes)

// Get a single recipe (Public)
router.get('/:id', getRecipeById)

// Create a recipe (Protected)
router.post('/', authMiddleware, createRecipe)

// Update a recipe (Protected)
router.put('/:id', authMiddleware, updateRecipe)

// Delete a recipe (Protected)
router.delete('/:id', authMiddleware, deleteRecipe)

module.exports = router
