<template>
	<div class="profile-message-container">
		<ul class="profile-message-nav">
			<li class="profile-message-item">
				<router-link :to="{ name: ''}">
					<translate>Sent</translate>
				</router-link>
			</li>
			<li class="profile-message-item">
				<router-link :to="{ name: ''}">
					<translate>Recieved</translate>
				</router-link>
			</li>
		</ul>
		<div class="profile-message-content">
			<i class="material-icons">&#xE0BE;</i>
			<div class="profile-message-notice"><translate>There are no messages</translate></div>
		</div>
	</div>
</template>

<script>

export default {
}
</script>

<style scoped lang="scss">
	.profile-message-container {
		height: 350px;
	}
	.profile-message-notice {
		font-size: 22px;
		opacity: 0.5;
		padding-bottom: 20px;
		@media screen and (min-width:320px) and (max-width: 480px){
			font-size: 18px;
		}
	}
	.material-icons {
		font-size: 130px;
		opacity: 0.5;
		padding: 50px 0 0;
	}
	.profile-message-content {
		display: flex;
		flex-direction: column;
		align-items: center;
		height: calc(100% - 45px);
	}
	.profile-message-nav {
		background: #f0f0f0;
	    border-bottom: 1px solid #ccc;
		display: flex;
		justify-content: flex-start;
		list-style: none;
		padding: 0;
		margin: 0;
	}
	.profile-message-item span {
		font-size: 16px;
		display: inline-block;
		padding: 10px 25px;
		height: 100%;
		@media screen and (min-width:320px) and (max-width: 480px){
			font-size: 14px;
		}
	}
	.profile-message-item + .profile-message-item:before {
		content: "";
		border-left: 1px solid #fff;
  		border-right: 1px solid #ccc;
	}
</style>
