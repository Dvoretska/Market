<template>
	<div class="footer-container">
		<div class="first-row">
			<span>Contact me</span>
			<span>Terms&Privacy</span>
			<span>RU</span>
		</div>
		<div class="second-row"><span class="copyright">&copy;2018 Home-market. All rights reserved.</span></div>
	</div>
</template>

<style scoped lang="scss">
	.footer-container {
		display: flex;
		justify-content: space-around;
		align-items: center;
		flex-direction: column;
		height: 80px;
		width: 100%;
	    background:#3C3C4A;
	    margin-top: 35px;
	    padding-bottom: 10px;
	    .first-row {
	    	& span{
				padding-left: 5px;
				padding-right: 5px;
				color: #7957d5;
				cursor: pointer;
				&:hover {
					text-decoration: underline;
				}
			}
	    }
	    .second-row span{
	    	color: #fff;
	    }
	}
</style>