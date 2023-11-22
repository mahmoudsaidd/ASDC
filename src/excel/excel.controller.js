import { asyncHandler } from "../services/asyncHandler.js";
import excelToJson from "convert-excel-to-json";
import excelModel from "../../Database/Model/excel.model.js";



export const uploadExcel = asyncHandler(async (req, res, next) => {
    
    // Extract the uploaded file from the request
    const file = req.file;

    // Check if a file was not provided in the request
    if (!file) {
        return res.status(400).json({ message: "Please upload an excel file" });
    }

    // Convert the Excel file to JSON using specified column mappings
    const result = excelToJson({
        sourceFile: file.path,
        header: {
            rows: 1
        },
        columnToKey: {
            A: 'id',
            B: 'ProductName',
            C: 'ProductDescription',
            D: 'Location',
            E: 'Price',
            F: 'Color'
        }
    });

    // Extract data from the 'Table 1' sheet of the converted JSON
    const table1Data = result['Table 1'];

    // Map the extracted data to match the database schema
    const data = table1Data ? table1Data.map(row => ({
        id: row.id,
        ProductName: row.ProductName,
        ProductDescription: row.ProductDescription,
        Location: row.Location,
        Price: row.Price,
        Color: row.Color
    })) : [];

    // Insert the mapped data into the database using the model
    const excelData = await excelModel.insertMany(data);

    // Return the inserted data as the response
    return res.send(excelData);
});






export const updateExcel = asyncHandler(async (req, res, next) => {
    // Extract id from request parameters
    const { id } = req.params;

    // Get the updated data from the request body
    const updatedData = req.body;

    // Use findOne to find the document by id
    const existingDocument = await excelModel.findOne({ id: id });

    // Check if the document was found
    if (!existingDocument) {
    
    return res.status(404).json({ message: "Document not found" });

    }

    // Update the found document with the new data
    Object.assign(existingDocument, updatedData);

    // Save the updated document
    const updatedDocument = await existingDocument.save();

    // Send the updated document as the response
    return res.json(updatedDocument);
});





export const deleteExcel = asyncHandler(async (req, res, next) => {
    
    // Extract id from request parameters
    const { id } = req.params;

    // Use findOneAndDelete to find the document by id and delete it
    const deletedDocument = await excelModel.findOneAndDelete({ id: id });

    // Check if the document was found and deleted
    if (!deletedDocument) {
    
    return res.status(404).json({ message: "Document not found" });

    }

    // Send the deleted document as the response and message that the document was deleted
    return res.json({ message: "Document deleted", deletedDocument });

});



export const getDataById = asyncHandler(async (req, res, next) => {
    
    const { id } = req.params;

    // Find data in the database for the given ID
    const data = await excelModel.find({ id });

    // Return the data as the response
    return res.send(data);
});