import { Schema, model, Types } from "mongoose";

const excelSchema = new Schema({
    
    id: {
        type: Number,
        required: true
    },
    
    ProductName: {
        type: String,
        required: true
    },
    
    ProductDescription: {
        type: String,
        required: true
    },
    
    Price: {
        type: Number,
        required: true
    },
    
    Location: {
        type: String,
        required: true
    },
    
    Color: {
        type: String,
        required: true
    }
});

const excelModel = model("excel", excelSchema);
export default excelModel;