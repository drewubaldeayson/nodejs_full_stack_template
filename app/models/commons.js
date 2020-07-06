class TITLE {
    static title = class {
        static operator = class {
            static get titleOnQueueVisitors() {
                return "ON QUEUE VISITORS";
            }
    
            static get titleVisitors() {
                return "VISITORS";
            }
    
            static get titleHosts() {
                return "HOSTS";
            }
        }
    
        static admin = class {
            static get titleVisitorsList() {
                return "VISITORS";
            }
    
            static get titleHostsList() {
                return "HOSTS";
            }
    
            static get titleOperatorsList() {
                return "OPERATORS";
            }
        }
    }

    static subtitle = class {
        static operator = class {
            static get subTitleOnQueueVisitors() {
                return "View all list of on queue visitors and their status and appointment details.";
            }
    
            static get subTitleVisitors() {
                return "View all list of visitors and their check-in and checkout details.";
            }
    
            static get subTitleHosts() {
                return "View all list of hosts and their details.";
            }
        }
    
        static admin = class {
            static get subTitleVisitorsList() {
                return "View all list of visitors.";
            }
    
            static get subTitleHostsList() {
                return "View all list of hosts.";
            }
    
            static get subTitleOperatorsList() {
                return "View all list of operators.";
            }
        }
    }
}

module.exports.TITLE = TITLE