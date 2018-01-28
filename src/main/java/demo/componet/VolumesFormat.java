package demo.componet;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.google.api.services.books.model.Volume;
import com.google.api.services.books.model.Volumes;

@Component
public class VolumesFormat {

    @Autowired
    BooksSample booksSample;

    public List<VolumeVo> volumesFormatter(String title){

        List<VolumeVo> VolumeVoList = new ArrayList<VolumeVo>();
        VolumeVo volumeVo=new VolumeVo();
        String titleArg[] ={title};

        Volumes volumes = booksSample.bookApi(titleArg);
        if(volumes==null){
            System.out.print("検索結果がありません。");
        }
        else{
            for(Volume volume : volumes.getItems()){
                volumeVo =new VolumeVo();
                Volume.VolumeInfo volumeInfo = volume.getVolumeInfo();
//                Volume.SaleInfo saleInfo = volume.getSaleInfo();
                volumeVo.setTitle(volumeInfo.getTitle());
                String authors="";
                for(String author:volumeInfo.getAuthors()){
                    authors = authors+","+author;
                }
                volumeVo.setAuthors(authors);
                volumeVo.setPublisher(volumeInfo.getPublisher());
                volumeVo.setPublishedDate(volumeInfo.getPublishedDate());
                VolumeVoList.add(volumeVo);
            }
        }
        return VolumeVoList;
    }
}
