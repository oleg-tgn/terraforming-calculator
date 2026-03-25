<template>
  <Combobox v-model="model" as="div" class="dropdown dropdown-end w-full">
    <div class="relative w-full">
      <ComboboxInput
        class="input input-bordered w-full pr-10"
        :display-value="(card: any) => card?.name ? `${card.name} (${card.cost ?? 0} M€)` : ''"
        placeholder="Поиск карты..."
        @change="query = $event.target.value"
      />
      <ComboboxButton class="absolute inset-0 w-full cursor-text" />
      <button
        v-if="model"
        type="button"
        class="btn btn-ghost btn-xs btn-circle absolute right-2 top-1/2 -translate-y-1/2 z-10"
        @click.stop="clear"
      >
        ✕
      </button>
    </div>
    <ComboboxOptions class="dropdown-content menu bg-base-100 rounded-box z-10 w-full max-h-60 overflow-auto shadow-lg">
      <li v-if="filteredOptions.length === 0" class="disabled">
        <span>Ничего не найдено</span>
      </li>
      <ComboboxOption
        v-for="card in filteredOptions"
        :key="card.cardNum"
        :value="card"
        v-slot="{ active, selected }"
        as="template"
      >
        <li :class="{ active, bordered: selected }">
          <span>{{ card.name }} ({{ card.cost ?? 0 }} M€)</span>
        </li>
      </ComboboxOption>
    </ComboboxOptions>
  </Combobox>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import {
  Combobox,
  ComboboxInput,
  ComboboxButton,
  ComboboxOptions,
  ComboboxOption,
} from "@headlessui/vue";
import type { Card } from "@/types/card";

interface CardWithName extends Card {
  name: string;
}

const model = defineModel<CardWithName | null>({ default: null });

const props = defineProps<{
  options: CardWithName[];
}>();

const query = ref("");

const filteredOptions = computed(() => {
  if (!query.value) return props.options;
  const q = query.value.toLowerCase();
  return props.options.filter((card) => card.name.toLowerCase().includes(q));
});

function clear() {
  model.value = null;
  query.value = "";
}
</script>
