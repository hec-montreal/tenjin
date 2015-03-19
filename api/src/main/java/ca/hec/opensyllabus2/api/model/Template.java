/**
 *
 */
package ca.hec.opensyllabus2.api.model;

import lombok.Data;
import lombok.NonNull;

/**
 */
@Data
public class Template {
    @NonNull private Long id;
    @NonNull private String title;
    private String description;
    @NonNull private Boolean active;
    /*
    private String createdBy;
    private Date createdDate;
    */
}
