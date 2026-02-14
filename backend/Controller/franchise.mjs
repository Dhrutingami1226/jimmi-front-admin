import Store from "../models/franchisemodel.js";

// CREATE - Add new franchise
export const franchise = async(req,res)=>{
    try{
        const {name, email, phoneno, country, state, pincode, hrspmonth, scoutshop} = req.body;
       
        if (!name || !email || !phoneno || !country || !state || !pincode || !hrspmonth || !scoutshop) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const lastFranchiseId = await Store.findOne().sort({ userId: -1 });
        const newFranchiseId = lastFranchiseId ? lastFranchiseId.userId + 1 : 1;

        const newFranchise = await Store.create({
            userId: newFranchiseId,
            name,
            email,
            phoneno,
            country,
            state,
            pincode,
            hrspmonth,
            scoutshop
        });
        res.status(201).json({message:"Franchise created successfully", newFranchise :{
            userId: newFranchise.userId,
            name: newFranchise.name,
            email: newFranchise.email,
            phoneno: newFranchise.phoneno,
            country: newFranchise.country,
            state: newFranchise.state,
            pincode: newFranchise.pincode,
            hrspmonth: newFranchise.hrspmonth,
            scoutshop: newFranchise.scoutshop
        }});
}catch (error){
    console.error("Error in Franchise",error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// READ - Get all franchises
export const getAllFranchises = async(req,res)=>{
    try{
        const franchises = await Store.find();
        res.status(200).json({message:"Franchises retrieved successfully", franchises});
    }catch (error){
        console.error("Error fetching franchises",error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// READ - Get single franchise by ID
export const getFranchiseById = async(req,res)=>{
    try{
        const {id} = req.params;
        const franchiseData = await Store.findById(id);
        if(!franchiseData){
            return res.status(404).json({ message: "Franchise not found" });
        }
        res.status(200).json({message:"Franchise retrieved successfully", franchiseData});
    }catch (error){
        console.error("Error fetching franchise",error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// UPDATE - Update franchise
export const updateFranchise = async(req,res)=>{
    try{
        const {id} = req.params;
        const {name, email, phoneno, country, state, pincode, hrspmonth, scoutshop} = req.body;
        
        const updatedFranchise = await Store.findByIdAndUpdate(
            id,
            {name, email, phoneno, country, state, pincode, hrspmonth, scoutshop},
            {new: true, runValidators: true}
        );
        
        if(!updatedFranchise){
            return res.status(404).json({ message: "Franchise not found" });
        }
        res.status(200).json({message:"Franchise updated successfully", updatedFranchise});
    }catch (error){
        console.error("Error updating franchise",error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// DELETE - Delete franchise
export const deleteFranchise = async(req,res)=>{
    try{
        const {id} = req.params;
        const deletedFranchise = await Store.findByIdAndDelete(id);
        
        if(!deletedFranchise){
            return res.status(404).json({ message: "Franchise not found" });
        }
        res.status(200).json({message:"Franchise deleted successfully", deletedFranchise});
    }catch (error){
        console.error("Error deleting franchise",error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};
