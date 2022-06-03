<template>

        <tr v-for="movie in paginated" :key="movie.id">
            <td><img
                style="height: 100px;width: 100px"
                class="group list-group-image"
                :src="movie.posterurl"
                alt=""
            /></td>
            <td>
                <router-link :to="'/movie/' + movie.id">
                    {{ movie.title }}</router-link></td>
            <td>    <div v-if="movie.storyline.length < 50">
                <p class="">
                    {{ movie.storyline }}
                </p>
            </div>
                <div v-if="movie.storyline.length >= 50">
                    <p class="">
                        {{ movie.storyline.substring(0, 50) + "....." }}
                    </p>
                </div>
            </td>
            <td>{{movie.year}}</td>
            <td>
                <ul style="list-style: none;">
                    <li
                        v-for="genre in movie.genres"
                        :key="genre.index"
                    >
                        {{ genre }}
                    </li>
                </ul>

            </td>
            <td>
                {{movie.imdbRating}}
            </td>
        </tr>

</template>

<script>
    export default {
        name: "MovieList",
        props: {
            paginated: Array,
        },
    }
</script>
<style scoped>
</style>
