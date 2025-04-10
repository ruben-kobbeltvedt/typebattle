<template>
  	<div class="bg-[#2C2C2C] flex flex-col w-screen h-screen">
      <Navigation class="px-32 pt-8" />
      <div class="flex flex-col">
        <h1 class="text-white text-xl ml-10">Vinnertavlen :)</h1>
        <div class="border-2 border-[#B0B0B0] rounded-md h-full flex mx-10 my-2">
            <UTable  :data="dataWithRanking" :columns="columns" class="flex-1" :ui="{td: 'text-white', th: 'text-white'}" />
        </div>
      </div>
    </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { supabase } from '../supabase';
import { useAsyncState } from '@vueuse/core';

const columns: TableColumn[] = [
    {
        header: 'Nr.',
        accessorKey: 'index',
    },
    {
        header: 'Brukernavn',
        accessorKey: 'username',
    },
    {
        header: "Ord per minutt",
        accessorKey: 'high_score',
    },
    {
        header: 'Dato',
        accessorKey: 'high_score_updated_at',
    },
];

const data = useAsyncState(async () => await supabase
    .from('profiles')
    .select('id, username, avatar_url, high_score, high_score_updated_at')
    .order('high_score_updated_at, high_score', { ascending: false })
    .limit(10), [])

const dataWithRanking = computed(() => {
    return data.state.value.data?.map((item, index) => ({
        ...item,
        index: index + 1,
        high_score_updated_at: new Date(item.high_score_updated_at).toLocaleDateString('no-NO', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
        }),
    }));
});

</script>