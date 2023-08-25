/*This is an auto generated class, please do not change.*/
/**
 * Class to create a LoadBalancerLinodeClass object
 * @category Linode
 */
class Linode_LoadBalancer {
	/**
	 *
	 * @param {module} do Linode SDK
	 * @param {object} options SDK options
	 */
	constructor(linodeSdk, linodeToken) {
		this._linode = linodeSdk;
		this._linodeToken = linodeToken;
	}
	/**
	 * Trigers the getNodeBalancers function of LoadBalancerLinodeClass
	 * @param {Params} params - Data required for getNodeBalancers
	 * @param {Filter} filters - Data required for getNodeBalancers
	 * @returns {Promise<getNodeBalancersResponse>}
	 */
	list(params = undefined, filters = undefined) {
		this._linode.setToken(this._linodeToken);
		return new Promise((resolve, reject) => {
			this._linode
				.getNodeBalancers(params, filters)
				.then(data => resolve(data))
				.catch(err => reject(err));
		});
	}
	/**
	 * Trigers the updateNodeBalancer function of LoadBalancerLinodeClass
	 * @param {NumberKeyword} nodeBalancerId - Data required for updateNodeBalancer
	 * @param {Partial} data - Data required for updateNodeBalancer
	 * @returns {Promise<updateNodeBalancerResponse>}
	 */
	update(nodeBalancerId, data) {
		this._linode.setToken(this._linodeToken);
		return new Promise((resolve, reject) => {
			this._linode
				.updateNodeBalancer(nodeBalancerId, data)
				.then(data => resolve(data))
				.catch(err => reject(err));
		});
	}
	/**
	 * Trigers the createNodeBalancer function of LoadBalancerLinodeClass
	 * @param {CreateNodeBalancerPayload} data - Data required for createNodeBalancer
	 * @returns {Promise<createNodeBalancerResponse>}
	 */
	create(data) {
		this._linode.setToken(this._linodeToken);
		return new Promise((resolve, reject) => {
			this._linode
				.createNodeBalancer(data)
				.then(data => resolve(data))
				.catch(err => reject(err));
		});
	}
	/**
	 * Trigers the deleteNodeBalancer function of LoadBalancerLinodeClass
	 * @param {NumberKeyword} nodeBalancerId - Data required for deleteNodeBalancer
	 * @returns {Promise<deleteNodeBalancerResponse>}
	 */
	delete(nodeBalancerId) {
		this._linode.setToken(this._linodeToken);
		return new Promise((resolve, reject) => {
			this._linode
				.deleteNodeBalancer(nodeBalancerId)
				.then(data => resolve(data))
				.catch(err => reject(err));
		});
	}
}
module.exports = Linode_LoadBalancer;