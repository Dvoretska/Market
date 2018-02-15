<template>
	<div class="profile-ads-container">
		<ul class="profile-ads-nav">
			<li class="profile-ads-item">
				<router-link :to="{ name: ''}">
					<span>Active</span>
				</router-link>
			</li>
			<li class="profile-ads-item">
				<router-link :to="{ name: ''}">
					<span>Not active</span>
				</router-link>
			</li>
		</ul>
		<div class="profile-ads-content">
			<i class="material-icons">&#xE14F;</i>
			<div class="profile-ads-notice">There are no active ads</div>
	    	<router-link :to="{ name: 'ads'}">
	        	<button-bar :label="'+ Create an ad'"></button-bar>
	      	</router-link>
      	</div>
	</div>
</template>

<script>
import buttonBar from '@/components/ButtonBar'

export default {
  components: {
    buttonBar
  }
}
</script>

<style scoped>
	.profile-ads-container {
		height: 350px;
	}
	.profile-ads-notice {
		font-size: 22px;
		opacity: 0.5;
		padding-bottom: 20px;
	}
	.material-icons {
		font-size: 130px;
		opacity: 0.5;
		padding: 50px 0 0;
	}
	.profile-ads-content {
		display: flex;
		flex-direction: column;
		align-items: center;
		height: calc(100% - 45px);
	}
	.profile-ads-nav {
		background: #f0f0f0;
	    border-bottom: 1px solid #ccc;
		display: flex;
		justify-content: flex-start;
		list-style: none;
		padding: 0;
		margin: 0;
	}
	.profile-ads-item span {
		font-size: 16px;
		display: inline-block;
		padding: 10px 25px;
		height: 100%;
	}
	.profile-ads-item + .profile-ads-item:before {
		content: "";
		border-left: 1px solid #fff;
  		border-right: 1px solid #ccc;
	}
</style>
