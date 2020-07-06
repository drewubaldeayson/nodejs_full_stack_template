class CONSTANTS{
    static PORT = class {
        static get HTTP_PORT() {
            return 3000;
        }
    
        static get HTTPS_PORT() {
            return 443;
        }
        
        static get LOCALHOST_PORT() {
            return 3000;
        }
    
        static get ACTIVE_PORT() {
            return this.HTTP_PORT;
        }
    }
    
    static JWT = class {
        static get JWT_SECRET() {
            return 'VMSIAG';
        }
    }

    static COOKIE = class {
        static get JWT_KEY() {
            return 'token';
        }
    }
    
    static DB_PARAMS = class {
        static get DB_HOST(){
            return "127.0.0.1"
        }

        static get DB_USER(){
            return "root"
        }

        static get DB_SCHEMA(){
            return "vms"
        }

        static get DB_PASSWORD(){
            return "@Auayson2o19"
        }
    }
    
    static USER_TYPE = class {
        static get USER_TYPE_VISITOR() {
            return 0;
        }
        static get USER_TYPE_OPERATOR() {
            return 1; 
        }
        static get USER_TYPE_ADMIN() {
            return 2;
        }
    }

    static UPLOADS_PARAMS = class {
        static get IMAGE_PATH(){
            var path = process.cwd()+"/app/files/checkin_selfie_uploads/";
            return path;

        }
    }

    static ENV_TYPE = class {
        static get DEVELOPMENT(){
            return "development";
        }

        static get PRODUCTION(){
            return "production";
        }
    }

    static EMAIL_PARAMS = class{
        static get USEREMAIL(){
            return "trends.bag.30@gmail.com";
        }

        static get PASSWORDEMAIL(){
            return "trendsbag30";
        }

        static get HOSTEMAIL(){
            return "smtp.gmail.com";
        }
        
        static get PORTEMAIL(){
            return "465";
        }
    }
}

module.exports.CONSTANTS = CONSTANTS;