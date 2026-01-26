import sellerService from "../service/SellerService.js";

class SellerController {

  // Get Seller Profile (from JWT)
  async getSellerProfile(req, res) {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader) {
        return res.status(401).json({ message: "Authorization token missing" });
      }

      const token = authHeader.split(" ")[1];
      const seller = await sellerService.getSellerProfile(token);

      res.status(200).json(seller);
    } catch (error) {
      res.status(401).json({ message: error.message });
    }
  };

  //Create Seller
  async createSeller(req, res) {
    try {
      const sellerData = req.body;
      const newSeller = await sellerService.createSeller(sellerData);
      res.status(201).json(newSeller);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  // Get Seller by ID
  async getSellerById(req, res) {
    try {
      const { id } = req.params;
      const seller = await sellerService.getSellerById(id);
      res.status(200).json(seller);
    }
    catch (error) {
      res.status(404).json({ message: error.message });
    }
  }

  // Update Seller
  async updateSeller(req, res) {
    try { 
      const existingSeller=await req.seller;
      const seller = await sellerService.updateSeller(existingSeller, req.body);
      res.status(200).json(seller);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  //get all sellers
  async getAllSellers(req, res) {
    try {
      const { status } = req.query;
      const sellers = await sellerService.getAllSellers(status);
      res.status(200).json(sellers);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
      

  // Get Seller by Email
  async getSellerByEmail(req, res) {
    try {
      const { email } = req.params;
      const seller = await sellerService.getsellerbyEmail(email);

      res.status(200).json(seller);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  }

  //update seller account status
  async updateSellerAccountStatus(req, res) {
    try {
      const { id } = req.params;
      const { status } = req.body;
      const updatedSeller = await sellerService.updateSellerAccountStatus(id, status);
      res.status(200).json(updatedSeller);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
   
  //delete seller
  async deleteSeller(req, res) {
    try {
      const { id } = req.params;
      await sellerService.deleteSeller(id);
      res.status(200).json({ message: 'Seller deleted successfully' });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

}

export default new SellerController();
