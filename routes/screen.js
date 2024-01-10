const startBtn = document.getElementById('startBtn');
const recordedVideo = document.getElementById('recordedVideo');
let mediaRecorder;
let recordedChunks = [];

startBtn.addEventListener('click', async () => {
    try {
        const stream = await navigator.mediaDevices.getDisplayMedia({ video: true });

        mediaRecorder = new MediaRecorder(stream);

        mediaRecorder.ondataavailable = event => {
            if (event.data.size > 0) {
                recordedChunks.push(event.data);
            }
        };

        mediaRecorder.onstop = () => {
            const recordedBlob = new Blob(recordedChunks, { type: 'video/webm' });
            recordedVideo.src = URL.createObjectURL(recordedBlob);
        };

        mediaRecorder.start();
        startBtn.disabled = true;
    } catch (error) {
        console.error('Error accessing screen:', error);
    }
});

// Stop recording
document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && mediaRecorder) {
        mediaRecorder.stop();
        startBtn.disabled = false;
    }
});