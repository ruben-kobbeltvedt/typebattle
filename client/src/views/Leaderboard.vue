<template>
    <div class="bg-(--ui-bg-elevated) border-2 border-(--ui-border-muted) rounded-md h-full flex m-10">
        <UTable  :data="data" :columns="columns" class="flex-1" />
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