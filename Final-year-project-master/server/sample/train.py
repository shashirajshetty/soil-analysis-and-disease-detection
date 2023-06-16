import tensorflow as tf
from keras import models, layers
import matplotlib.pyplot as plt
import numpy as np
import pathlib
import os
import cv2
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '2'

dir = os.listdir('plantvillage')
for filenames in dir:
    print(filenames)

Current_Dir = os.getcwd()
dataset = pathlib.Path('plantvillage')
print(dataset)

Image_Size = 256
Batch_Size = 32
Channels = 3
Epochs = 40


dataset = tf.keras.preprocessing.image_dataset_from_directory(dataset, batch_size = Batch_Size, image_size = (Image_Size, Image_Size), shuffle = True) 
class_name=dataset.class_names
print("CLASSES",class_name)
print(len(dataset))
print(dataset)

def split_dataset(ds, train_split=0.99, val_split=0.005, test_split=0.005, shuffle=True, shuffle_size=10000):
    
    if shuffle:
        ds = ds.shuffle(shuffle_size, seed = 10)
        
    ds_size = len(ds)
    train_size = int(train_split * ds_size)
    val_size = int(val_split * ds_size)
    
    train_ds = ds.take(train_size)
    val_ds = ds.skip(train_size).take(val_size)
    test_ds = ds.skip(train_size).skip(val_size)
    
    return train_ds, val_ds, test_ds

train_data, val_data, test_data = split_dataset(dataset)

print("Size of Data is :{0} \nBatch size of Training Data is :{1}\nBatch size of Validation Data is :{2} \nBatch size of Testing Data is :{3} " .format(len(dataset), len(train_data), len(val_data), len(test_data)))

train_ds = train_data.cache().shuffle(100).prefetch(buffer_size = tf.data.AUTOTUNE)
val_ds = val_data.cache().shuffle(100).prefetch(buffer_size = tf.data.AUTOTUNE)
test_ds = test_data.cache().shuffle(100).prefetch(buffer_size = tf.data.AUTOTUNE)

resize_and_rescale = tf.keras.Sequential([
    layers.Resizing(Image_Size, Image_Size),
    layers.Rescaling(1.0/255)
])

data_augmentation = tf.keras.Sequential([
    layers.RandomFlip(mode="horizontal_and_vertical"),
    layers.RandomRotation(factor = 0.5)
])



input_shape = (Batch_Size, Image_Size, Image_Size, Channels)
model = models.Sequential([
    resize_and_rescale,
    data_augmentation,
    layers.Conv2D(filters = 16, kernel_size = (3,3), activation = 'relu', input_shape = input_shape),
    layers.MaxPool2D((2,2)),
    layers.Conv2D(64, (3,3), activation = 'relu'),
    layers.MaxPool2D((2,2)),
    layers.Conv2D(128, (3,3), activation = 'relu'),
    layers.MaxPool2D((2,2)),
    layers.Conv2D(64, (3,3), activation = 'relu'),
    layers.MaxPool2D((2,2)),
    layers.Conv2D(128, (3,3), activation = 'relu'),
    layers.MaxPool2D((2,2)),
    layers.Conv2D(64, (3,3), activation = 'relu'),
    layers.MaxPool2D((2,2)),
    layers.Flatten(),
    layers.Dense(128, activation = 'relu'),
    layers.Dense(64, activation = 'softmax'),

])


model.build(input_shape = input_shape)
model.summary()

model.compile(
    optimizer = 'adam', 
    loss = tf.keras.losses.SparseCategoricalCrossentropy(from_logits = False), 
    metrics = ['accuracy'])

print(train_data)

history = model.fit(
train_data, epochs = 20, batch_size = Batch_Size, verbose = 1, validation_data = val_data)

scores = model.evaluate(train_data)


# for batch_image, batch_label in train_data.take(10):
#     print("IMG",batch_image[0])
#     first_image = batch_image[0].numpy().astype('uint8')
#     first_label = class_name[batch_label[0]]
    
#     print('First Image of batch to predict :')
#     plt.imshow(first_image)
#     print('Actual label : ', first_label)
    
#     batch_prediction = model.predict(batch_image)
#     # print(batch_prediction)
#     print('Predicted label : ', class_name[np.argmax(batch_prediction[0])])
#     plt.axis('off')
# data = pathlib.Path('test_imgs')

# data = tf.keras.preprocessing.image_dataset_from_directory(data, batch_size = Batch_Size, image_size = (Image_Size, Image_Size), shuffle = True) 
# print(data)

# testImgs = dataset.take(1)
# for i,j in testImgs:
#     img = i[0].numpy().astype('uint8')
#     img = np.expand_dims(img,axis=0)
#     print(img.shape)
#     lab = class_name[j[0]]
#     # plt.imshow(img)
#     # plt.show()
#     predict = model.predict(img)
#     print(predict)
#     print('Predicted label : ', class_name[np.argmax(predict[0])])
# img_list = os.listdir('test_imgs/c1/')
# for k in range(len(img_list)):
#     img = cv2.imread('test_imgs/c1/'+img_list[k]) 
#     img=cv2.resize(img,(256,256))
#     img = np.expand_dims(img,axis=0)
#     predict = model.predict(img)
#     print(img_list[k]+' --- ', class_name[np.argmax(predict)])

count=0
correctCount=0
for batch_image, batch_label in train_data.take(10):
    for i in range(len(batch_image)):
        # print("IMG",batch_image[i])
        first_image = batch_image[i].numpy().astype('uint8')
        first_label = class_name[batch_label[i]]
        
        print('First Image of batch to predict :')
        plt.imshow(first_image)
        print("######################")
        print('Actual label : ', first_label)
    
        batch_prediction = model.predict(batch_image)
        # print(batch_prediction)
        prediction = class_name[np.argmax(batch_prediction[i])]
        print('Predicted label : ',prediction )
        print("######################")
        if(first_label==prediction):
            correctCount+=1
        count+=1
        print(count,correctCount,correctCount//count)
        plt.axis('off')
# data = pathlib.Path('test_imgs')

model.save('new-potato.model')

