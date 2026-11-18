const Recipe = require('../models/Recipe')

// 1. Create a new recipe
const createRecipe = async (req, res) => {
  try {
    const {
      title,
      description,
      ingredients,
      instructions,
      image,
      category,
      cookingTime
    } = req.body

    const recipe = await Recipe.create({
      title,
      description,
      ingredients,
      instructions,
      image,
      category,
      cookingTime,
      createdBy: req.userId
    })

    res.status(201).json({
      message: 'Recipe created successfully!',
      recipe
    })

  } catch (error) {
    if (error.name === 'ValidationError' || error.name === 'CastError') {
      return res.status(400).json({
        message: error.message
      })
    }

    res.status(500).json({
      message: 'Failed to create recipe',
      error: error.message
    })
  }
}



// 2. Get all recipes
const getAllRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find()
      .populate('createdBy', 'username fullname')
      .sort({ createdAt: -1 })

    res.status(200).json({
      count: recipes.length,
      recipes
    })

  } catch (error) {
    res.status(500).json({
      message: 'Failed to fetch recipes',
      error: error.message
    })
  }
}


// 3. Get a single recipe by ID
const getRecipeById = async (req, res) => {
  try {
    const { id } = req.params

    if (!Recipe.schema.path('_id').cast(id)) {
      return res.status(400).json({
        message: 'Invalid recipe ID'
      })
    }

    const recipe = await Recipe.findById(id)
      .populate('createdBy', 'username fullname')

    if (!recipe) {
      return res.status(404).json({
        message: 'Recipe not found'
      })
    }

    res.status(200).json({ recipe })

  } catch (error) {
    res.status(500).json({
      message: 'Failed to fetch recipe',
      error: error.message
    })
  }
}


// 4. Update a recipe
const updateRecipe = async (req, res) => {
  try {
    const { id } = req.params

    if (!Recipe.schema.path('_id').cast(id)) {
      return res.status(400).json({
        message: 'Invalid recipe ID'
      })
    }

    const {
      title,
      description,
      ingredients,
      instructions,
      image,
      category,
      cookingTime
    } = req.body

    const updatedRecipe = await Recipe.findOneAndUpdate(
      { _id: id, createdBy: req.userId },
      {
        title,
        description,
        ingredients,
        instructions,
        image,
        category,
        cookingTime
      },
      {
        new: true,
        runValidators: true
      }
    )

    if (!updatedRecipe) {
      return res.status(404).json({
        message: 'Recipe not found or you are not authorized to update it'
      })
    }

    res.status(200).json({
      message: 'Recipe updated successfully!',
      recipe: updatedRecipe
    })

  } catch (error) {
    res.status(500).json({
      message: 'Failed to update recipe',
      error: error.message
    })
  }
}


// 5. Delete a recipe
const deleteRecipe = async (req, res) => {
  try {
    const { id } = req.params

    if (!Recipe.schema.path('_id').cast(id)) {
      return res.status(400).json({
        message: 'Invalid recipe ID'
      })
    }

    const deletedRecipe = await Recipe.findOneAndDelete({
      _id: id,
      createdBy: req.userId
    })

    if (!deletedRecipe) {
      return res.status(404).json({
        message: 'Recipe not found or you are not authorized to delete it'
      })
    }

    res.status(200).json({
      message: 'Recipe deleted successfully!'
    })

  } catch (error) {
    res.status(500).json({
      message: 'Failed to delete recipe',
      error: error.message
    })
  }
}


module.exports = {
  createRecipe,
  getAllRecipes,
  getRecipeById,
  updateRecipe,
  deleteRecipe
}
