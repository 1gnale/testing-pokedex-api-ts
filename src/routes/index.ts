import { Router } from 'express'
import typesRouter from './typesRouter';
// import pokemonsRouter from './pokemonsRouter';

const router = Router()

router.use('/types', typesRouter)
router.use('/pokemons', (_req, res) => res.send('pokemons'))

export default router
