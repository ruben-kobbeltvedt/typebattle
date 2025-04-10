<template>
  	<div class="bg-[#2C2C2C] flex flex-col w-screen h-screen">
      <Navigation class="px-32 pt-8" />
      <div class="flex flex-col">
        <h1 class="text-white text-xl ml-10">Vinnertavlen :)</h1>
        <div class="border-2 border-[#B0B0B0] rounded-md h-full flex mx-10 my-2">
            <UTable  :data="data" :columns="columns" class="flex-1" td="text-white" :ui="{td: 'text-white', th: 'text-white'}" />
        </div>
      </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const columns: TableColumn[] = [
    {
        header: 'Nr.',
        accessorKey: 'ranking',
    },
    {
        header: 'Brukernavn',
        accessorKey: 'name',
    },
    {
        header: "Ord per minutt",
        accessorKey: 'score',
    },
]

const data = ref([
    {
        id: 1,
        name: 'John Doe',
        ranking: 1,
        score: 100,
    },
    {
        id: 2,
        name: 'Jane Smith',
        ranking: 2,
        score: 90,
    },
    {
        id: 3,
        name: 'Alice Johnson',
        ranking: 3,
        score: 85,
    },
    {
        id: 4,
        name: 'Bob Brown',
        ranking: 4,
        score: 80,
    },
    {
        id: 5,
        name: 'Charlie Davis',
        ranking: 5,
        score: 75,
    },
])

</script>