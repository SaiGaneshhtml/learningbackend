import { Router } from 'express'; 
import { createPost ,getPosts ,updatePost ,deletePost} from '../controllers/post.controller.js';

const router = Router();

router.route('/create').post(createPost);
router.route('/getposts').get(getPosts);
router.route('/update/:id').patch(updatePost); // using patch upadteing some of the data 
//put - updating the whole data
router.route('/delete/:id').delete(deletePost);
export default router;