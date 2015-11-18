package ca.hec.opensyllabus2.api.model.template;

import java.util.List;

import lombok.*;

/**
 * @author <a href="mailto:mame-awa.diop@hec.ca">Mame Awa Diop</a>
 * @author <a href="mailto:curtis.van-osch@hec.ca">Curtis van Osch</a>
 * @version $Id: $
 */
@Data
@NoArgsConstructor
public class Template {

    private Long id;
    private String title;
    private String description;
    private Boolean active;
    private List<TemplateElement> elements;
//    private String createdBy;
//    private Date createdDate;
}
