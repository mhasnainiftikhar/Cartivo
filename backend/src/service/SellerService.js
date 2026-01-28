import Seller from "../model/Seller.js";
import JwtProvider from "../utils/JwtProvider.js";
import Address from '../model/Address.js';
import { hashPassword } from "../utils/hashUtils.js";

class SellerService {


    //Create new seller
    async createSeller(sellerData) {
        try {
            if (!sellerData) {
                throw new Error('Seller data is required');
            }
            const existingSeller = await Seller.findOne({ email: sellerData.email });
            if (existingSeller) {
                throw new Error('Seller with this email already exists');
            }

            let saveAddress = await Address.create(sellerData.pickupAddress || {});

            const hashedPassword = await hashPassword(sellerData.password);

            const newSeller = new Seller({
                sellerName: sellerData.name,
                email: sellerData.email,
                password: hashedPassword,
                GST: sellerData.GST,
                mobile: sellerData.mobile,
                businessDetails: sellerData.businessDetails,
                bankDetails: sellerData.bankDetails,
                pickupAddress: saveAddress._id
            });
            const savedSeller = await newSeller.save();
            return savedSeller;
        } catch (error) {
            throw new Error('Error creating seller: ' + error.message);
        }
    };

    //Get seller profile using JWT
    async getSellerProfile(jwt) {
        const seller = JwtProvider.getEmailFromJwt(jwt);
        return await this.getsellerbyEmail(seller);
    };

    //Get seller by email
    async getsellerbyEmail(email) {
        try {
            const seller = await Seller.findOne({ email });
            if (!seller) {
                throw new Error('Seller not found');
            }
            return seller;
        } catch (error) {
            throw new Error('Error fetching seller by email: ' + error.message);
        }
    };

    //Get seller by ID
    async getsellerbyId(sellerId) {
        try {
            const seller = await Seller.findById(sellerId);
            if (!seller) {
                throw new Error('Seller not found');
            }
            return seller;
        } catch (error) {
            throw new Error('Error fetching seller by ID: ' + error.message);
        }
    };

    //Get all sellers
    async getAllSellers(status) {
        try {
            const sellers = await Seller.find(status ? { accountStatus: status } : {});
            return sellers;
        } catch (error) {
            throw new Error('Error fetching all sellers: ' + error.message);
        }

    };

    //update seller account
    async updateSeller(existingSeller, sellerData) {
        try {
            
            delete sellerData.accountStatus;
            delete sellerData.role;

            Object.assign(existingSeller, sellerData);
            const updatedSeller = await existingSeller.save();
            return updatedSeller;
        } catch (error) {
            throw new Error('Error updating seller: ' + error.message);
        }
    };

    //update seller account status
    async updateSellerAccountStatus(sellerId, status) {
        try {
            const updatedSeller = await Seller.findByIdAndUpdate(sellerId, { accountStatus: status }, { new: true });
            if (!updatedSeller) {
                throw new Error('Seller not found');
            }
            return updatedSeller;
        } catch (error) {
            throw new Error('Error updating seller account status: ' + error.message);
        }
    };

    //delete seller
    async deleteSeller(sellerId) {
        try {
            const deletedSeller = await Seller.findByIdAndDelete(sellerId);
            if (!deletedSeller) {
                throw new Error('Seller not found');
            }
        } catch (error) {
            throw new Error('Error deleting seller: ' + error.message);
        }
    }
}
export default new SellerService();