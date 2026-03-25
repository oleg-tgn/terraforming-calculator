<template>
  <div class="min-h-screen bg-base-200 p-6">
    <div class="max-w-2xl mx-auto">
      <h1 class="text-4xl font-bold text-center mb-8">
        Terraforming Mars Profit Calculator 🚀
      </h1>

      <div class="card bg-base-100 shadow-xl mb-6">
        <div class="card-body">
          <h2 class="card-title">Настройки поколений</h2>
          <div class="grid grid-cols-2 gap-4">
            <div class="form-control">
              <label class="label">
                <span class="label-text">Текущее поколение</span>
              </label>
              <input
                type="number"
                v-model.number="currentGen"
                min="1"
                class="input input-bordered"
              />
            </div>
            <div class="form-control">
              <label class="label">
                <span class="label-text">Финальное поколение</span>
              </label>
              <input
                type="number"
                v-model.number="targetGen"
                min="1"
                class="input input-bordered"
              />
            </div>
          </div>
        </div>
      </div>

      <div class="card bg-base-100 shadow-xl mb-6">
        <div class="card-body">
          <h2 class="card-title">Выберите карту для анализа</h2>

          <div class="form-control">
            <label class="label cursor-pointer justify-start gap-3">
              <input
                type="checkbox"
                v-model="showOnlyPositiveMC"
                class="checkbox checkbox-primary"
              />
              <span class="label-text">Только карты с prod.mc > 0</span>
            </label>
          </div>

          <CardSelect v-model="selectedCard" :options="filteredCardsList" />
        </div>
      </div>

      <div v-if="selectedCard" class="card bg-base-100 shadow-xl">
        <div class="card-body">
          <h2 class="card-title">Анализ для: {{ selectedCard.name }}</h2>

          <div class="stats stats-vertical lg:stats-horizontal shadow w-full">
            <div class="stat">
              <div class="stat-title">Затраты</div>
              <div class="stat-value text-lg">
                {{ (selectedCard.cost ?? 0) + 3 }} M€
              </div>
              <div class="stat-desc">покупка + розыгрыш</div>
            </div>

            <div class="stat">
              <div class="stat-title">Победные очки</div>
              <div class="stat-value text-lg text-secondary">
                {{ calculateROI.vp }} ПО
              </div>
            </div>
          </div>

          <div class="divider"></div>

          <h3 class="font-semibold mb-2">
            Итог по поколениям (если сыграть в X поколении)
          </h3>
          <div
            v-if="Object.keys(selectedCard.prod ?? {}).length > 0"
            class="overflow-x-auto"
          >
            <table class="table table-compact w-full">
              <tbody>
                <tr>
                  <th class="text-right">GEN</th>
                  <td
                    v-for="gen in generationResults"
                    :key="gen.gen"
                    class="text-center"
                  >
                    {{ gen.gen }}
                  </td>
                </tr>
                <tr v-for="res in activeResources" :key="res">
                  <th class="text-right">{{ resourceLabels[res] }}</th>
                  <td
                    v-for="gen in generationResults"
                    :key="gen.gen"
                    class="text-center font-bold"
                    :class="
                      (gen.resources[res] ?? 0) >= 0
                        ? 'text-success'
                        : 'text-error'
                    "
                  >
                    {{ gen.resources[res] ?? 0 }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="flex flex-wrap justify-center gap-2 mt-4">
            <div
              v-if="!selectedCard.prod?.mc"
              class="badge badge-lg text-lg p-4 badge-error"
            >
              Затраты: -{{ (selectedCard.cost ?? 0) + 3 }}M€
            </div>
            <div
              v-for="res in activeResources"
              :key="res"
              class="badge badge-lg text-lg p-4"
              :class="
                (calculateROI.resources[res] ?? 0) >= 0
                  ? 'badge-success'
                  : 'badge-warning'
              "
            >
              {{ resourceLabels[res] }}:
              {{ (calculateROI.resources[res] ?? 0) >= 0 ? "+" : ""
              }}{{ calculateROI.resources[res] ?? 0 }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { projects } from "@/data";
import CardSelect from "@/components/CardSelect.vue";
import type { Card } from "@/types/card";

interface CardWithName extends Card {
  name: string;
}

function formatCardName(name: string): string {
  return name.replace(/([a-z])([A-Z])/g, "$1 $2");
}

const cardsList = computed<CardWithName[]>(() =>
  Object.entries(projects)
    .map(([name, card]) => ({
      ...(card as Card),
      name: formatCardName(name),
    }))
    .sort((a, b) => a.name.localeCompare(b.name)),
);

const currentGen = ref(2);
const targetGen = ref(10);
const selectedCard = ref<CardWithName | null>(null);
const showOnlyPositiveMC = ref(false);

const filteredCardsList = computed(() =>
  showOnlyPositiveMC.value
    ? cardsList.value.filter((card) => (card.prod?.mc ?? 0) > 0)
    : cardsList.value
);

const resourceTypes = ["mc", "steel", "ti", "plant", "energy", "heat"] as const;
type ResourceType = (typeof resourceTypes)[number];

const resourceLabels: Record<ResourceType, string> = {
  mc: "M€",
  steel: "Steel",
  ti: "Titan",
  plant: "Plant",
  energy: "Energy",
  heat: "Heat",
};

const calculateROI = computed(() => {
  if (!selectedCard.value)
    return {
      income: 0,
      vp: 0,
      total: 0,
      resources: {} as Record<ResourceType, number>,
    };

  const card = selectedCard.value;
  const gensRemaining = targetGen.value - currentGen.value;

  const cost = card.cost ?? 0;
  const vp = card.vp ?? 0;

  const resources = {} as Record<ResourceType, number>;
  for (const res of resourceTypes) {
    const prod = card.prod[res] ?? 0;
    if (prod !== 0) {
      if (res === "mc") {
        // M€ считаем с учётом затрат
        resources[res] = prod * gensRemaining - (cost + 3);
      } else {
        resources[res] = prod * gensRemaining;
      }
    }
  }

  const income = (card.prod.mc ?? 0) * gensRemaining;
  const total = income - (cost + 3);

  return { income, vp, total, resources };
});

const generationResults = computed(() => {
  if (!selectedCard.value) return [];

  const card = selectedCard.value;
  const cost = (card.cost ?? 0) + 3;
  const results = [];

  for (let gen = currentGen.value; gen <= targetGen.value; gen++) {
    const gensPassed = gen - currentGen.value;
    const resources = {} as Record<ResourceType, number>;

    for (const res of resourceTypes) {
      const prod = card.prod[res] ?? 0;
      if (prod !== 0) {
        if (res === "mc") {
          // M€ считаем с учётом затрат для отображения окупаемости
          resources[res] = prod * gensPassed - cost;
        } else {
          resources[res] = prod * gensPassed;
        }
      }
    }

    results.push({ gen, resources });
  }

  return results;
});

// Ресурсы, которые есть в продакшене карты (для отображения строк таблицы)
const activeResources = computed(() => {
  if (!selectedCard.value) return [] as ResourceType[];

  const active = new Set<ResourceType>();
  for (const res of resourceTypes) {
    if ((selectedCard.value.prod[res] ?? 0) !== 0) {
      active.add(res);
    }
  }

  return resourceTypes.filter((r) => active.has(r));
});
</script>
