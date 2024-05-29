/**
 * Class representing a page of manga or anime.
 */
export  class MPages  {
    /**
     * Create an MPages instance.
     * @param {Array<MManga>} list - The list of manga or anime.
     * @param {boolean} hasNextPage - Whether there is a next page.
     */
    constructor(list, hasNextPage) {
        this.list = list;
        this.hasNextPage = hasNextPage;
    }
}

