import mongoose from "mongoose"
export const dbConnect = async () => {
   try {
      await mongoose.connect('mongodb://localhost:27017/mystore');
      console.log('Db connect successfully........');
   } catch (err) {
      console.log('Db connection failed', err.message);
   }
};
