export const changeSlidesPerView = () => {
	const widthDoc = document.body.clientWidth
	if (widthDoc < 640) return 1
	if (widthDoc >= 640 && widthDoc < 1024) return 2
	if (widthDoc >= 1024 && widthDoc < 1280) return 3
	if (widthDoc >= 1280) return 5
}
