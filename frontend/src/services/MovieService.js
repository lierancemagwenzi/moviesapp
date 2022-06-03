import http from "../http-common";
class TutorialDataService {
    getAll() {
        return http.get("/movies");
    }
    get(id) {
        return http.get(`/movie/${id}`);
    }
    findByTitle(title) {
        return http.get(`/movies?title=${title}`);
    }
}
export default new TutorialDataService();
