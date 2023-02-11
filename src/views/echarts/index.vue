<template>
	<div id="chart" style="width: 100%; height: 500px"></div>
</template>
<script setup lang="ts">
import * as echarts from 'echarts'
import { onMounted } from 'vue'

onMounted(() => {
	const myChart = echarts.init(document.getElementById('chart') as HTMLElement)
	const options = {
		legend: {
			data: ['派出人次', '派出组次'],
			top: 'top',
			left: 'right'
		},
		tooltip: {
			trigger: 'axis',
			axisPointer: {
				type: 'line' // 默认为直线，可选为：'line' | 'shadow'
			}
		},
		xAxis: {
			type: 'category',
			data: [
				'1月',
				'2月',
				'3月',
				'4月',
				'5月',
				'6月',
				'7月',
				'8月',
				'9月',
				'10月',
				'11月',
				'12月'
			]
		},
		yAxis: {
			type: 'value'
		},
		series: [
			{
				data: [12, 22, 23, 34, 12, 5, 65, 23, 44, 23, 34, 54],
				name: '派出人次',
				type: 'line',
				itemStyle: {
					label: {
						show: true,
						color: '#0c74d9'
					},
					color: {
						type: 'linear',
						x: 0,
						y: 0,
						x2: 0,
						y2: 1,
						colorStops: [
							{
								offset: 0,
								color: '#4195fc' // 0% 处的颜色
							},
							{
								offset: 1,
								color: '#0c74d9' // 100% 处的颜色
							}
						],
						global: false // 缺省为 false
					}
				}
			},
			{
				data: [22, 23, 34, 12, 5, 65, 23, 44, 23, 34, 54, 12],
				name: '派出组次',
				type: 'line',
				itemStyle: {
					label: {
						show: true,
						color: '#f8977c'
					},
					color: {
						type: 'linear',
						x: 0,
						y: 0,
						x2: 0,
						y2: 1,
						colorStops: [
							{
								offset: 0,
								color: '#fb7d56' // 0% 处的颜色
							},
							{
								offset: 1,
								color: '#f8977c' // 100% 处的颜色
							}
						],
						global: false // 缺省为 false
					}
				}
			}
		]
	}
	myChart.setOption(options)
})
</script>
<style scoped></style>
