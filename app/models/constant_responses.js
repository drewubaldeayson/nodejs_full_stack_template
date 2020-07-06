class ConstantResponses{
    static successResponse = class {
        static get loginSuccess(){
            return "Login Successful";
        }

        static get addHostSuccess(){
            return "Host has been added successfully!";
        }

        static get updateHostSuccess(){
            return "Host has been updated successfully!";
        }

        static get addVisitorSuccess(){
            return "Visitor has been added successfully!";
        }

        static get approveVisitorSuccess(){
            return "Visitor has been approved successfully!"
        }

        static get verifyVisitorSuccess(){
            return "Visitor has been verified successfully!";
        }

        static get rejectVisitorSuccess(){
            return "Visitor has been rejected successfully!";
        }

        static get updateVisitorSuccess(){
            return "Visitor has been updated successfully!";
        }

        static get addOperatorSuccess(){
            return "Operator has been added successfully!";
        }

        static get updateOperatorSuccess(){
            return "Operator has been updated successfully!";
        }

        static get operatorChangePasswordSuccess(){
            return "Operator's Password has been changed successfully!";
        }
    }

    static errorResponse = class{
        static get loginError(){
            return "Login Failed";
        }
    }
}
module.exports.ConstantResponses = ConstantResponses;