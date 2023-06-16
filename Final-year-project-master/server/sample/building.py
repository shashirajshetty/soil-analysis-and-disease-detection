import os
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '3' 
import tensorflow as tf
from keras import layers,models
import matplotlib.pyplot as plt
from colorama import Fore
import numpy as np

IMG_SIZE=256
BATCH_SIZE=32
EPOCS = 10
CHANNELS=3
INPUT_SHAPE=(BATCH_SIZE,IMG_SIZE,IMG_SIZE,CHANNELS)

dataset = tf.keras.preprocessing.image_dataset_from_directory(
    'dataset',
    shuffle=True,
    image_size=(IMG_SIZE,IMG_SIZE),
    batch_size=BATCH_SIZE
)

class_names = dataset.class_names
print(Fore.RED + "CLASSES",class_names)
print(Fore.WHITE)
dataset = dataset.shuffle(10000,seed=12)
train_ds = dataset.take(54)
test_ds = dataset.skip(54)

val_ds = test_ds.take(7)
test_ds = test_ds.skip(7)

# CACHING
train_ds=train_ds.cache().shuffle(1000).prefetch(buffer_size=tf.data.AUTOTUNE)
val_ds=val_ds.cache().shuffle(1000).prefetch(buffer_size=tf.data.AUTOTUNE)
test_ds=test_ds.cache().shuffle(1000).prefetch(buffer_size=tf.data.AUTOTUNE)

resize_and_rescale = tf.keras.Sequential([
    layers.Resizing(IMG_SIZE,IMG_SIZE),
    layers.Rescaling(1.0/255)
])

data_augmentation = tf.keras.Sequential([
    layers.RandomFlip(mode="horizontal_and_vertical"),
    layers.RandomRotation(factor = 0.2),
    layers.RandomContrast(factor=0.2),
    layers.RandomZoom(height_factor=(0.2,0.2),width_factor=(0.1,0.1)),
    layers.RandomBrightness(factor=0.2)
])

model = models.Sequential([
    resize_and_rescale,
    data_augmentation,
    layers.Conv2D(32,(3,3),activation='relu',input_shape=INPUT_SHAPE),
    layers.MaxPooling2D((2,2)),
    layers.Conv2D(45,(3,3),activation='relu',input_shape=INPUT_SHAPE),
    layers.MaxPooling2D((2,2)),
    layers.Conv2D(54,(3,3),activation='relu',input_shape=INPUT_SHAPE),
    layers.MaxPooling2D((2,2)),
    layers.Conv2D(64,(3,3),activation='relu',input_shape=INPUT_SHAPE),
    layers.MaxPooling2D((2,2)),
    layers.Conv2D(72,(3,3),activation='relu',input_shape=INPUT_SHAPE),
    layers.MaxPooling2D((2,2)),
    layers.Conv2D(81,(3,3),activation='relu',input_shape=INPUT_SHAPE),
    layers.MaxPooling2D((2,2)),
    layers.Flatten(),
    layers.Dense(64,activation='relu'),
    layers.Dense(3,activation='softmax')
])


model.build(input_shape=INPUT_SHAPE)

model.compile(
    optimizer='adam',
    loss=tf.keras.losses.SparseCategoricalCrossentropy(from_logits=False),
    metrics=[['accuracy','mse']]
)

history = model.fit(
    train_ds,
    epochs=EPOCS,
    batch_size=BATCH_SIZE,
    verbose=1,
    validation_data=val_ds
)
count=0
correctCount=0
for images_batch,label_batch in test_ds.take(1):
    # for i in range(10):
        first_image = images_batch[0].numpy().astype('uint8')
        first_label = class_names[label_batch[0]]
        
        print('First Image of batch to predict :')
        plt.imshow(first_image)
        print("######################")
        print('Actual label : ', first_label)
    
        batch_prediction = model.predict(images_batch[0])
        # print(batch_prediction)
        prediction = class_names[np.argmax(batch_prediction[0])]
        print('Predicted label : ',prediction )
        print("######################")
        if(first_label==prediction):
            correctCount+=1
        count+=1
        print(count,correctCount,correctCount/count)
        plt.axis('off')