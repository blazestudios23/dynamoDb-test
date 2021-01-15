import { Router } from 'express';
import RepoRouter from './Repos';


// Init router and path
const router = Router();

// Add sub-routes

router.use('/repos', RepoRouter);

// Export the base-router
export default router;
