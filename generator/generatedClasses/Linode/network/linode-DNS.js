/*This is an auto generated class, please do not change.*/
/**
    * Class to create a DNSLinodeClass object
    * @category Linode
    */
class Linode_DNS {
    /**
     *
     * @param {module} do Linode SDK
     * @param {object} options SDK options
     */
    constructor(linodeSdk, linodeToken) {
        this._linode = linodeSdk;
        this._linodeToken = linodeToken;
        this._linode.setToken(this._linodeToken);
    }
    /**
        * Trigers the getDomainRecords function of DNSLinodeClass
        * @param {NumberKeyword} domainId - Data required for getDomainRecords
    * @param {AnyKeyword} params - Data required for getDomainRecords
        * @returns {Promise<getDomainRecordsResponse>}
        */
    getRecords(domainId, params = undefined) {
        return new Promise((resolve, reject) => {
            this._linode.getDomainRecords(domainId, params)
                .then(data => resolve(data))
                .catch(err => reject(err));
        });
    }
    /**
        * Trigers the getDomainRecord function of DNSLinodeClass
        * @param {NumberKeyword} domainId - Data required for getDomainRecord
    * @param {NumberKeyword} recordId - Data required for getDomainRecord
        * @returns {Promise<getDomainRecordResponse>}
        */
    getRecord(domainId, recordId) {
        return new Promise((resolve, reject) => {
            this._linode.getDomainRecord(domainId, recordId)
                .then(data => resolve(data))
                .catch(err => reject(err));
        });
    }
    /**
        * Trigers the createDomainRecord function of DNSLinodeClass
        * @param {NumberKeyword} domainId - Data required for createDomainRecord
    * @param {Partial} data - Data required for createDomainRecord
        * @returns {Promise<createDomainRecordResponse>}
        */
    createRecords(domainId, data) {
        return new Promise((resolve, reject) => {
            this._linode.createDomainRecord(domainId, data)
                .then(data => resolve(data))
                .catch(err => reject(err));
        });
    }
    /**
        * Trigers the updateDomainRecord function of DNSLinodeClass
        * @param {NumberKeyword} domainId - Data required for updateDomainRecord
    * @param {NumberKeyword} recordId - Data required for updateDomainRecord
    * @param {Partial} data - Data required for updateDomainRecord
        * @returns {Promise<updateDomainRecordResponse>}
        */
    changeRecordSets(domainId, recordId, data) {
        return new Promise((resolve, reject) => {
            this._linode.updateDomainRecord(domainId, recordId, data)
                .then(data => resolve(data))
                .catch(err => reject(err));
        });
    }
    /**
        * Trigers the deleteDomainRecord function of DNSLinodeClass
        * @param {NumberKeyword} domainId - Data required for deleteDomainRecord
    * @param {NumberKeyword} recordId - Data required for deleteDomainRecord
        * @returns {Promise<deleteDomainRecordResponse>}
        */
    deleteRecord(domainId, recordId) {
        return new Promise((resolve, reject) => {
            this._linode.deleteDomainRecord(domainId, recordId)
                .then(data => resolve(data))
                .catch(err => reject(err));
        });
    }
}
module.exports = Linode_DNS;
