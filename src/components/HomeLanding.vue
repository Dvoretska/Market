<template>
	<div class="home-landing">
		<header class="home-header">
			<ul class="home-menu">
				<li class="menu-item">HOME</li>
				<li class="menu-item">SHOP</li>
				<li class="menu-item">CREATE AD</li>
				<li class="menu-item">ABOUT</li>
				<li class="menu-item">CONTACT</li>
			</ul>
		</header>
		<div class="main-img">
			<div class="title-wrapper">
				<h1 class="main-title">Buy & Sell Easy</h1>
				<p class="main-text">With Home Market</p>
				<button class="cta">
					<span>START NOW</span>
				</button>
			</div>
		</div>
	</div>
</template>

<script>


export default {
}

</script>

<style scoped lang="scss">
.home-landing {
	.home-header {
		position: fixed;
		top: 0;
		left: 0;
		height: 90px;
		width: 100%;
		background: red;
		z-index: 50;
		background-color: rgba(36, 42, 53, 0.6);
		border-bottom: 1px solid rgba(255, 255, 255, 1);
		padding: 0 50px;
		cursor: pointer;
		.home-menu {
			list-style: none;
			.menu-item {
				font-size: 14px;
				line-height: 90px;
				display: inline-block;
				padding: 0 10px;
				color: #FFFFFF;
				transition: color 0.4s ease 0s;
			}
		}	
	}
	.main-img {
		background-image: url('../assets/Online-Market-Place.jpg');
		background-repeat: no-repeat;
		background-position: center right;
		background-size: cover;
		padding-right: 150px;
		width: 100%;
		height: 641px;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: flex-end;
		.title-wrapper {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			.main-title {
				font-size: 48px;
				line-height: 1.3em;
				color: #fff;
				font-family: 'Muli', sans-serif;
			}
			.main-text {
				font-size: 38px;
				line-height: 1.3em;
				color: #fff;
				font-weight: 300;
				margin-bottom: 35px;
			}
			.cta {
				width: 145px;
				height: 40px;
				display: flex;
				align-items: center;
				justify-content: center;
				background-color: transparent;
				border: solid rgba(255, 255, 255, 1) 1px;
				cursor: pointer;
				transition: border-color 0.4s ease 0s, background-color 0.4s ease 0s;
				&:hover {
					background-color: rgba(255, 255, 255, 0.26);
					border-color: transparent;
					transition: border-color 0.4s ease 0s, background-color 0.4s ease 0s;
				}
				span {
					font-weight: 300;
					font-size: 14px;
					color: #fff;
				}
			}
		}
	}
}
</style>
