import { Router } from 'express'
import typesRouter from './typesRouter';
import pokemonsRouter from './pokemonsRouter';

const router = Router()

router.use('/types', typesRouter)
router.use('/pokemons', pokemonsRouter)

export default router
