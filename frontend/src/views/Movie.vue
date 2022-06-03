<template>
    <h3>Movie</h3>
    <div class="container">
        <div v-if="loading" class="loader text-center"></div>
        <div class="card" v-if="movie!=null">
        <div class="card-header">
            <h2>{{movie.title}}</h2>
            <p>{{ movie.year }}
            <br>
               Rating: {{movie.imdbRating}}
            </p>
        </div>

        <div class="card-body">
            <img class="mx-auto d-block featured-img pb-20" :src="movie.posterurl" alt="">
            <br />
            <p class="text-justify text-center">{{ movie.storyline }}</p>
        </div>
        <div class="card-footer">

            <div class="row">
                <div class="col-md-6">
                    <ul style="list-style: none;">
                        <h4 class="text-center">Genres</h4>
                        <li
                            v-for="genre in movie.genres"
                            :key="genre.index"
                        >
                            <p class="text-center">{{ genre }}</p>
                        </li>
                    </ul>
                </div>
                <div class="col-md-6">
                    <ul style="list-style: none;">
                        <h4 class="text-center">Cast</h4>
                        <li
                            v-for="actor in movie.actors"
                            :key="actor.index"
                        >
                            <p class="text-center">{{ actor }}</p>
                        </li>
                    </ul>
                </div>
            </div>


        </div>
    </div>
    </div>
</template>

<script>
    import MovieDataService from "../services/MovieService";
    export default {
        name: "Movie",
        data(){
            return{

                loading:false,
                id:  this.$route.params.id,
                movie:null,

            }
        },
        methods:{
            getMovie(){
                this.loading=true;
                MovieDataService.get(this.id)
                    .then(({data})=>{

                        this.movie = data;
                        this.loading=false;
                    })
                    .catch(error=>{
                        this.loading=false;
                        console.log(error);
                    })
            },
        },

        created(){
            this.getMovie();
        }
    }
</script>

<style lang="scss" scoped>
    .movie-detail {
        padding: 16px;
        h2 {
            color: #000000;
            font-size: 28px;
            font-weight: 600;
            margin-bottom: 16px;
        }
        .featured-img {
            display: block;
            max-width: 200px;
            margin-bottom: 16px;
        }
        p {
            color: #000000;
            font-size: 18px;
            line-height: 1.4;
        }
    }

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
