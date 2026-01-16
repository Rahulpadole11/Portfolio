import express from 'express';
import {
  getSectionData,
  updateSectionData,
  getAllSectionsData,
} from '../controllers/sectionController.js';

const router = express.Router();

// Get section data
router.get('/:section', getSectionData);

// Update section data
router.put('/:section', updateSectionData);

// Get all sections
router.get('/', getAllSectionsData);

export default router;
