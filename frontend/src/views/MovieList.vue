<template>
    <div class="container">
        <h2>Movies</h2>
        <div class="row">
            <div class="col-md-12">
                <div class="input-group">
                    <input v-model="this.search" placeholder="Search Movies" class="form-control border-end-0 border rounded-pill" type="text"  id="example-search-input">
                    <span class="input-group-append">
            </span>
                </div>
            </div>

        </div>
<br />
        <b-pagination
            v-model="currentPage"
            :total-rows="this.filteredList.length"
            :per-page="perPage"
            class="text-dark"
            aria-controls="my-table"
            @input="paginate(currentPage)"
        ></b-pagination>
<!--        loader-->
<div class="text-center">
    <div v-if="loading" class="loader text-center"></div>
</div>
<!--        toogle view button-->
        <div class="row">
            <div class="col-md-8">
            </div>
            <div class="col-md-4">
                <button class="btn btn-block btn-dark  float-end" v-on:click="toggleView()">{{this.toogleTile}}
                </button>
            </div>
        </div>
<!--        listview-->
     <div v-if="this.view=='list'">
         <table class="table  table-hover table-responsive">
             <thead class="thead-dark">
             <tr>
                 <th>Thumbnail</th>
                 <th>Title</th>
                 <th>StoryLine</th>
                 <th>Year</th>
                 <th>Genres</th>
                 <th>Rating</th>
             </tr>
             </thead>
             <tbody>
         <MovieListCard :paginated="paginated"/>
             </tbody>
         </table>
     </div>

<!--      gridview-->
        <div class="row" v-if="this.view=='grid'" style="text-decoration: none;">
            <div class="col-md-4 pt-5" v-for="movie in paginated" :key="movie.id" >
            <MovieCard :movie="movie"/>
            </div>
        </div>
    </div>
</template>

<script>
    import MovieDataService from "../services/MovieService";
    import MovieCard from '../components/MovieCard'
    import MovieListCard from '../components/MovieListCard'
    export default {
        name: "MovieList",
        search: 't',
        components:{MovieCard,MovieListCard},
        data() {
            return {
                perPage: 6,
                search:'',
                currentPage: 1,
                loading:false,
                view:"grid",
                toogleTile:"List View",
                movies: [],
                displayMovies:[],
                currentTutorial: null,
                currentIndex: -1,
                title: ""
            };
        },
        methods: {
            paginate(currentPage) {
                console.log("paginate");
               let start=(currentPage-1)*this.perPage;
                this.displayMovies=this.movies.slice(start,start+3);
            },
            retrieveMovies() {
                this.loading=true
                MovieDataService.getAll()
                    .then(response => {


                        response.data.forEach((movie) => {
                            let genres="";
                            movie.genres.forEach((genre) => {
                                genres=genres+genre+","
                            });
                            movie.groups=genres;
                        });
                        this.movies = response.data;
                        this.loading=false
                    })
                    .catch(e => {
                        console.log(e);
                        this.loading=false
                    });
            },
            toggleView(){
                if(this.view=="grid"){
                    this.view="list";
                    this.toogleTile="Grid View";
                }
                else{
                    this.view="grid";
                    this.toogleTile="List View";
                }
            }
        },

            computed: {
                indexStart() {
                    return (this.currentPage - 1) * this.perPage;
                },
                indexEnd() {
                    return this.indexStart + this.perPage;
                },
                paginated() {
                    return this.filteredList.slice(this.indexStart, this.indexEnd);
                },
                filteredList() {
                    if (this.search.length == 0) {
                        return this.movies;
                    }
                    return this.movies.filter(movie => {
                        return movie.title.toLowerCase().includes(this.search.toLowerCase())
                    })
                },

            },
        mounted() {
            this.retrieveMovies();
        }
    }
</script>

<style scoped>
    .loader {
        border: 16px solid #f3f3f3;
        border-radius: 50%;
        border-top: 16px solid #3498db;
        position:fixed;
        position: fixed;
        top: 50%;
        left: 50%;
        width: 120px;
        height: 120px;
        -webkit-animation: spin 2s linear infinite; /* Safari */
        animation: spin 2s linear infinite;
    }

    /* Safari */
    @-webkit-keyframes spin {
        0% { -webkit-transform: rotate(0deg); }
        100% { -webkit-transform: rotate(360deg); }
    }

    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
</style>
