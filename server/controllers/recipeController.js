const mongoose = require('mongoose')
const Recipe = require('../models/Recipe')

// 1. Create a new recipe
const createRecipe = async (req, res) => {
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
    success: true,
    message: 'Recipe created successfully!',
    recipe
  })
}

// 2. Get all recipes with search, filtering, sorting and pagination
const getAllRecipes = async (req, res) => {
  const page = Math.max(1, parseInt(req.query.page) || 1)
  const limit = Math.min(50, Math.max(1, parseInt(req.query.limit) || 10))

  const skip = (page - 1) * limit

  const { search, category, sort } = req.query

  // Build query
  const query = {}

  // Search by recipe title
  if (search) {
    query.title = {
      $regex: search,
      $options: 'i'
    }
  }

  // Filter by category
  if (category) {
    query.category = category
  }

  // Sorting options
  const sortOptions = {
    newest: { createdAt: -1 },
    oldest: { createdAt: 1 },
    alphabetical: { title: 1 },
    cookingTime: { cookingTime: 1 }
  }

  const sortBy = sortOptions[sort] || sortOptions.newest

  // Fetch recipes and total count simultaneously
  const [recipes, totalRecipes] = await Promise.all([
    Recipe.find(query)
      .populate('createdBy', 'username fullname')
      .sort(sortBy)
      .skip(skip)
      .limit(limit),

    Recipe.countDocuments(query)
  ])

  res.status(200).json({
    success: true,
    page,
    limit,
    sort: sort || 'newest',
    totalRecipes,
    totalPages: Math.ceil(totalRecipes / limit),
    count: recipes.length,
    recipes
  })
}

// 3. Get a single recipe by ID
const getRecipeById = async (req, res) => {
  try {
    const { id } = req.params

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid recipe ID'
      })
    }

    const recipe = await Recipe.findById(id)
      .populate('createdBy', 'username fullname')

    if (!recipe) {
      return res.status(404).json({
        success: false,
        message: 'Recipe not found'
      })
    }

    res.status(200).json({
      success: true,
      recipe
    })

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch recipe',
      error: error.message
    })
  }
}

// 4. Update a recipe
const updateRecipe = async (req, res) => {
  try {
    const { id } = req.params

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
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
        success: false,
        message: 'Recipe not found or you are not authorized to update it'
      })
    }

    res.status(200).json({
      success: true,
      message: 'Recipe updated successfully!',
      recipe: updatedRecipe
    })

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to update recipe',
      error: error.message
    })
  }
}

// 5. Delete a recipe
const deleteRecipe = async (req, res) => {
  try {
    const { id } = req.params

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid recipe ID'
      })
    }

    const deletedRecipe = await Recipe.findOneAndDelete({
      _id: id,
      createdBy: req.userId
    })

    if (!deletedRecipe) {
      return res.status(404).json({
        success: false,
        message: 'Recipe not found or you are not authorized to delete it'
      })
    }

    res.status(200).json({
      success: true,
      message: 'Recipe deleted successfully!'
    })

  } catch (error) {
    res.status(500).json({
      success: false,
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
