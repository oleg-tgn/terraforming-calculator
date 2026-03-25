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
          <select v-model="selectedCard" class="select select-bordered w-full">
            <option :value="null" disabled>Выберите карту...</option>
            <option v-for="card in cardsList" :key="card.cardNum" :value="card">
              {{ card.name }} ({{ card.cost ?? 0 }} M€)
            </option>
          </select>
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
              <div class="stat-title">Доход до {{ targetGen }} пок.</div>
              <div class="stat-value text-lg text-info">
                {{ calculateROI.income }} M€
              </div>
            </div>

            <div class="stat">
              <div class="stat-title">Победные очки</div>
              <div class="stat-value text-lg text-secondary">
                {{ calculateROI.vp }} ПО
              </div>
            </div>
          </div>

          <div class="divider"></div>

          <div class="text-center">
            <div
              class="badge badge-lg text-xl p-4"
              :class="calculateROI.total >= 0 ? 'badge-success' : 'badge-error'"
            >
              Итог: {{ calculateROI.total }} M€
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
import type { Card } from "@/types/card";

interface CardWithName extends Card {
  name: string;
}

const cardsList = computed<CardWithName[]>(() =>
  Object.entries(projects).map(([name, card]) => ({
    ...card as Card,
    name
  }))
);

const currentGen = ref(2);
const targetGen = ref(10);
const selectedCard = ref<CardWithName | null>(null);

const calculateROI = computed(() => {
  if (!selectedCard.value) return { income: 0, vp: 0, total: 0 };

  const card = selectedCard.value;
  const gensRemaining = targetGen.value - currentGen.value;

  const income = (card.prod.mc ?? 0) * gensRemaining;
  const vp = card.vp ?? 0;
  const cost = card.cost ?? 0;
  const total = income - (cost + 3);

  return { income, vp, total };
});
</script>
