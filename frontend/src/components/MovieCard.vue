<template>

        <router-link :to="'/movie/' + movie.id"  style="text-decoration: none; color: inherit;"
        >

            <div class="card" style="width:400px">
                <img class="card-img-top" :src="movie.posterurl" alt=""  height="600">
                <div class="card-body">
                    <h4 class="card-title text-dark">{{movie.title}}</h4>
                    <p style="text-decoration: none;font-size: 14px" class="text text-dark"  v-if="movie.storyline.length < 50">
                        {{ movie.storyline }}
                    </p>
                    <div>
                        <p>Year:{{movie.year}}<br>
                            Rating:{{movie.imdbRating}}</p>
                    </div>

                    <p style="text-decoration: none;font-size: 14px" class="text text-dark" v-if="movie.storyline.length >= 50">
                        {{ movie.storyline.substring(0, 50) + "....." }}
                    </p>


                    <ul style="list-style: none;">
                        <h4 class="text-center">Genres</h4>
                        <li>{{movie.groups}}</li>
                    </ul>

                    <a href="#" class="btn btn-dark">View Details</a>
                </div>
            </div>

        </router-link>



</template>

<script>
    export default {
        name: "MovieCard",
            props: {
                movie: Object,
            },

    }
</script>

<style scoped>

</style>
